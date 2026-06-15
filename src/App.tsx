import{useState}from'react'
  interface Item{id:string;desc:string;qty:number;rate:number}
  const uid=()=>Math.random().toString(36).slice(2,8)
  const fmt=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD'})
  export default function App(){
    const[from,setFrom]=useState('1Sultan\nFull-Stack Developer\nTaif, Saudi Arabia\nhello@example.com')
    const[to,setTo]=useState('Client Name\nCompany LLC\nclient@example.com')
    const[invNum,setInvNum]=useState('INV-001')
    const[date,setDate]=useState(new Date().toISOString().slice(0,10))
    const[due,setDue]=useState('')
    const[items,setItems]=useState<Item[]>([{id:uid(),desc:'Web Development Services',qty:1,rate:2500},{id:uid(),desc:'UI/UX Design',qty:3,rate:150}])
    const[tax,setTax]=useState(15)
    const[note,setNote]=useState('Thank you for your business!')
    const addItem=()=>setItems(i=>[...i,{id:uid(),desc:'',qty:1,rate:0}])
    const updateItem=(id:string,key:keyof Item,val:string|number)=>setItems(i=>i.map(it=>it.id===id?{...it,[key]:val}:it))
    const removeItem=(id:string)=>setItems(i=>i.filter(it=>it.id!==id))
    const subtotal=items.reduce((s,i)=>s+i.qty*i.rate,0)
    const taxAmt=subtotal*(tax/100)
    const total=subtotal+taxAmt
    const print=()=>window.print()
    const iStyle=(p:string,extra?:React.CSSProperties):React.CSSProperties=>({background:'#111827',border:'1px solid #334155',borderRadius:6,padding:p,color:'#e2e8f0',outline:'none',fontSize:'0.85rem',width:'100%',...extra})
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0',padding:'2rem'}}>
        <style>{`@media print{body{background:#fff!important;color:#000!important}.no-print{display:none!important}.invoice{background:#fff!important;color:#000!important;border:none!important}}`}</style>
        <div style={{maxWidth:860,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}} className="no-print">
            <h1 style={{fontWeight:800,fontSize:'1.75rem',color:'#f8fafc'}}>🧾 Invoice Generator</h1>
            <button onClick={print} style={{padding:'0.65rem 1.5rem',background:'#0ea5e9',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:700}}>🖨 Print / Export PDF</button>
          </div>
          <div className="invoice" style={{background:'#111827',border:'1px solid #1e293b',borderRadius:16,padding:'2.5rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <div>
                <div style={{fontSize:'2rem',fontWeight:800,color:'#38bdf8',marginBottom:'0.25rem'}}>INVOICE</div>
                <textarea value={from} onChange={e=>setFrom(e.target.value)} rows={4} style={{...iStyle('0.5rem'),resize:'none',width:220,background:'transparent',border:'none',color:'#94a3b8',fontSize:'0.85rem',lineHeight:1.6}}/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',alignItems:'flex-end'}}>
                <div style={{display:'flex',gap:'0.75rem',alignItems:'center'}}>
                  <span style={{color:'#475569',fontSize:'0.8rem'}}>Invoice #</span>
                  <input value={invNum} onChange={e=>setInvNum(e.target.value)} style={{...iStyle('0.4rem 0.75rem'),width:120,textAlign:'right'}}/>
                </div>
                <div style={{display:'flex',gap:'0.75rem',alignItems:'center'}}>
                  <span style={{color:'#475569',fontSize:'0.8rem'}}>Date</span>
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...iStyle('0.4rem 0.75rem'),width:150}}/>
                </div>
                <div style={{display:'flex',gap:'0.75rem',alignItems:'center'}}>
                  <span style={{color:'#475569',fontSize:'0.8rem'}}>Due</span>
                  <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{...iStyle('0.4rem 0.75rem'),width:150}}/>
                </div>
              </div>
            </div>
            <div style={{marginBottom:'2rem'}}>
              <div style={{color:'#94a3b8',fontSize:'0.75rem',fontWeight:600,marginBottom:'0.4rem'}}>BILL TO</div>
              <textarea value={to} onChange={e=>setTo(e.target.value)} rows={3} style={{...iStyle('0.5rem'),resize:'none',width:280,background:'transparent',border:'none',color:'#e2e8f0',lineHeight:1.6}}/>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'1.5rem'}}>
              <thead>
                <tr style={{borderBottom:'1px solid #334155'}}>
                  {['Description','Qty','Rate','Amount',''].map(h=><th key={h} style={{padding:'0.5rem',color:'#94a3b8',fontSize:'0.75rem',fontWeight:600,textAlign:h==='Amount'||h==='Rate'||h==='Qty'?'right':'left'}}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map(it=>(
                  <tr key={it.id} style={{borderBottom:'1px solid #1e293b'}}>
                    <td style={{padding:'0.6rem 0.5rem'}}><input value={it.desc} onChange={e=>updateItem(it.id,'desc',e.target.value)} placeholder="Item description" style={{...iStyle('0.3rem 0.5rem'),background:'transparent',border:'1px solid transparent',width:'100%'}}/></td>
                    <td style={{padding:'0.6rem 0.5rem',textAlign:'right'}}><input type="number" value={it.qty} onChange={e=>updateItem(it.id,'qty',+e.target.value)} style={{...iStyle('0.3rem 0.5rem'),width:60,textAlign:'right'}}/></td>
                    <td style={{padding:'0.6rem 0.5rem',textAlign:'right'}}><input type="number" value={it.rate} onChange={e=>updateItem(it.id,'rate',+e.target.value)} style={{...iStyle('0.3rem 0.5rem'),width:90,textAlign:'right'}}/></td>
                    <td style={{padding:'0.6rem 0.5rem',textAlign:'right',fontWeight:600,color:'#38bdf8'}}>{fmt(it.qty*it.rate)}</td>
                    <td style={{padding:'0.6rem 0.25rem',textAlign:'center'}}><button onClick={()=>removeItem(it.id)} className="no-print" style={{background:'none',border:'none',color:'#475569',cursor:'pointer',fontSize:'1rem'}}>×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addItem} className="no-print" style={{padding:'0.5rem 1rem',background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:6,cursor:'pointer',fontSize:'0.85rem',marginBottom:'1.5rem'}}>+ Add Line Item</button>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'2rem'}}>
              <div style={{width:260}}>
                {[{label:'Subtotal',val:fmt(subtotal),bold:false},{label:`Tax (${tax}%)`,val:fmt(taxAmt),bold:false},{label:'Total',val:fmt(total),bold:true}].map(r=>(
                  <div key={r.label} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 0',borderBottom:r.bold?'none':'1px solid #1e293b'}}>
                    <span style={{color:'#94a3b8',fontSize:'0.9rem'}}>{r.label}</span>
                    <span style={{fontWeight:r.bold?800:500,color:r.bold?'#38bdf8':'#e2e8f0',fontSize:r.bold?'1.1rem':'0.9rem'}}>{r.val}</span>
                  </div>
                ))}
                <div style={{display:'flex',gap:'0.5rem',alignItems:'center',marginTop:'0.5rem'}} className="no-print">
                  <span style={{color:'#94a3b8',fontSize:'0.8rem'}}>Tax %:</span>
                  <input type="number" value={tax} onChange={e=>setTax(+e.target.value)} min={0} max={100} style={{...iStyle('0.3rem 0.5rem'),width:60,textAlign:'right'}}/>
                </div>
              </div>
            </div>
            {note&&<div style={{borderTop:'1px solid #1e293b',paddingTop:'1rem'}}>
              <div style={{color:'#475569',fontSize:'0.75rem',marginBottom:'0.25rem'}}>NOTE</div>
              <input value={note} onChange={e=>setNote(e.target.value)} style={{...iStyle('0.3rem 0.5rem'),background:'transparent',border:'none',color:'#94a3b8',width:'100%'}}/>
            </div>}
          </div>
        </div>
      </div>
    )
  }